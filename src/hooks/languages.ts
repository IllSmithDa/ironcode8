import { useQuery } from "@tanstack/react-query";
import { axiosFetch } from "../axios";
import { Language } from "../types";

export default function UseAllLanguages() {
  const languageQuery =  useQuery({
    queryKey:["languages"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/language/all-languages");
      return res.data.data;
    },
  });
  const languages:Language[] = languageQuery.data;
  return languages;
}

