import Image from "next/image";
import { Card } from "../ui/card";

type CardInfo = {
  title: string;
  image: string;
};

export default function CardsList({ items }: { items: CardInfo[] }) {
  return items.map((item, idx) => (
    <Card
      key={idx}
      className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[300px]"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        style={{ objectFit: "cover" }}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-3 backdrop-blur-sm">
        <p className="text-sm font-semibold">{item.title}</p>
      </div>
    </Card>
  ));
}
