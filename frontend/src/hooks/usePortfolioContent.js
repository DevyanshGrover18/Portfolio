import { useEffect, useState } from "react";
import { portfolioContentService } from "../services/portfolioContentService";

export const usePortfolioContent = (section, fallback = []) => {
  const [items, setItems] = useState(fallback);
  useEffect(() => {
    let active = true;
    portfolioContentService.get(section).then((result) => {
      if (active && result.data?.length) {
        setItems(result.data.map((item) => ({ ...item.data, id: item.data.id || item._id, _contentId: item._id })));
      }
    }).catch(() => {});
    return () => { active = false; };
  }, [section]);
  return items;
};
