import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

// const StyledLocationLink = styled(StyledLink)`
//   text-align: center;
//   background-color: white;
//   border: 3px solid lightsalmon;
// `;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  const { name, image, location, mapURL, description } = place;

  async function deletePlace() {
    const confirmation = confirm(`Do you really want to delete ${name}?`);
    if (confirmation) {
      const response = await fetch(`/api/places/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      }
    }
  }

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink $justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {name}, {location}
      </h2>
      <Link href={mapURL} passHref legacyBehavior>
        <StyledLink $variant="outlined">Location on Google Maps</StyledLink>
      </Link>
      <p>{description}</p>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton
          onClick={() => {
            deletePlace(id);
          }}
          type="button"
          $variant="delete"
        >
          Delete
        </StyledButton>
      </ButtonContainer>
    </>
  );
}
