"use client";

import { FeedCard } from "@/components/FeedCard";

type TimelineItem = {
  title: string;
  link: string;
  pubDate?: string;
  source: string;
};

type Props = {
  items: TimelineItem[];
};

export function TimelineList({ items }: Props) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={`${item.link}-${index}`}>
          <FeedCard item={item} source={item.source} dateFormat="datetime" />
        </li>
      ))}
    </ul>
  );
}
