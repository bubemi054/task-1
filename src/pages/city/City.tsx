import { useParams } from "react-router";

export default function City() {
  const { city } = useParams<{ city: string }>();
  return <div>{city}</div>;
}
