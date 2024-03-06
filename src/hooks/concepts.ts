import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../axios";
import { ConceptTopic } from "../types";


// https://stackoverflow.com/questions/68336399/access-data-already-fetched-with-react-query-in-other-component
// https://tanstack.com/query/v4/docs/framework/react/guides/dependent-queries
export default function UseConceptTopics() {
  const conceptTopicsQuery =  useQuery({
    queryKey:["conceptTopics"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/concept/all-topics");
      return res.data.data;
    },
  });
  const concepts: ConceptTopic[] = conceptTopicsQuery.data;
  return concepts;
}

