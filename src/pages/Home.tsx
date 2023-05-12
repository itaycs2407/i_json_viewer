import styled from "@emotion/styled";
import React from "react";
import JsonSection from "../components/JsonSection";

const testObj = {
  ke54y1: true,
  ke234y2: "value2",
  keysdafasdf3: "value3",
  keasdfy4: "value4",
  key5: ["value5", "value6", "value7"],
  key6: {
    key1: {
      ke54y1: true,
      ke234y2: "value2",
      keysdafasdf3: "value3",
      keasdfy4: "value4",
      key5: ["value5", "value6", "value7"],
      key6: {
        key1: "value1",
        key2: "value2",
      },
      key2: "value2",
    },
  },
};

const test1 = [
  {
    id: 1,
    name: "محمدرضا راد",
    username: "Morad",
    email: "morad@april.biz",
    password: "Ab485652",
    avatar: "https://avatars.dicebear.com/api/male/mamad.svg",
    address: {
      country: "ایران",
      city: "تبریز",
      street: "خیابان امام",
      alley: "کوچه بهشتی",
      number: 168,
      geo: {
        lat: "38.066667",
        lng: "46.3",
      },
    },
    phone: "+989143548471",
    website: "http://hildegard.org",
    company: "آتیه سازان شرق",
  },
  {
    id: 2,
    name: "فرشاد لطفی",
    username: "Farshad",
    email: "farshad@gmail.com",
    password: "Gr365481",
    avatar: "https://avatars.dicebear.com/api/male/farshad.svg",
    address: {
      country: "ایران",
      city: "تهران",
      street: "خیابان بهشتی",
      alley: "کوچه یغما",
      number: 25,
      geo: {
        lat: "31.94",
        lng: "51.647778",
      },
    },
    phone: "+989332548474",
    website: "http://chapgars.com",
    company: "چاپگرهای متنی",
  },
  {
    id: 3,
    name: "لیلا غلامی",
    username: "Leila",
    email: "leila@april.biz",
    password: "Ti487596",
    avatar: "https://avatars.dicebear.com/api/female/leila.svg",
    address: {
      country: "ایران",
      city: "اصفهان",
      street: "خیابان دوستی",
      alley: "کوچه صفا",
      number: 74,
      geo: {
        lat: "32.6546275",
        lng: "51.6679826",
      },
    },
    phone: "+989215147848",
    website: "http://grindal.org",
    company: "گریندال",
  },
  {
    id: 4,
    name: "نسترن خدایی",
    username: "Nastaran",
    email: "nasi@gmail.com",
    password: "Ok487526",
    avatar: "https://avatars.dicebear.com/api/female/nastaran.svg",
    address: {
      country: "ایران",
      city: "تبریز",
      street: "خیابان بهار",
      alley: "کوچه شما",
      number: 254,
      geo: {
        lat: "38.066667",
        lng: "46.3",
      },
    },
    phone: "+989387845214",
    website: "http://chaldora.org",
    company: "چالدورا",
  },
  {
    id: 5,
    name: "سبحان لامعی",
    username: "Sobhan",
    email: "sobhan@yahoo.com",
    password: "Qw845365",
    avatar: "https://avatars.dicebear.com/api/male/sobhan.svg",
    address: {
      country: "ایران",
      city: "مشهد",
      street: "خیابان امام",
      alley: "کوچه خدایی",
      number: 619,
      geo: {
        lat: "38.425117",
        lng: "45.769636",
      },
    },
    phone: "+989354812514",
    website: "http://tigland.org",
    company: "تیگلند",
  },
  {
    id: 6,
    name: "نسیم بخشی",
    username: "Nasim",
    email: "nasim@gmail.com",
    password: "Pl487596",
    avatar: "https://avatars.dicebear.com/api/female/nasim.svg",
    address: {
      country: "ایران",
      city: "شیراز",
      street: "خیابان صادقی",
      alley: "کوچه شعبانی",
      number: 36,
      geo: {
        lat: "37.3159",
        lng: "81.1496",
      },
    },
    phone: "+989148574748",
    website: "http://hilard.org",
    company: "هیلارد",
  },
  {
    id: 7,
    name: "ماهان آقایی",
    username: "Mahan",
    email: "mahan@yahoo.com",
    password: "Mj264875",
    avatar: "https://avatars.dicebear.com/api/male/mahan.svg",
    address: {
      country: "ایران",
      city: "تبریز",
      street: "خیابان امام",
      alley: "کوچه بهشتی",
      number: 164,
      geo: {
        lat: "38.066667",
        lng: "46.3",
      },
    },
    phone: "+989143548471",
    website: "http://hildegard.org",
    company: "آتیه سازان شرق",
  },
  {
    id: 8,
    name: "شهلا رضایی",
    username: "Shahla",
    email: "shahla@april.biz",
    password: "Mu264879",
    avatar: "https://avatars.dicebear.com/api/female/shahla.svg",
    address: {
      country: "ایران",
      city: "تهران",
      street: "خیابان ولیعصر",
      alley: "کوچه رضایی",
      number: 79,
      geo: {
        lat: "31.94",
        lng: "51.647778",
      },
    },
    phone: "+989365684717",
    website: "http://nanoran.org",
    company: "نانوران",
  },
  {
    id: 9,
    name: "بهراد میرزایی",
    username: "Behrad",
    email: "behrad@april.biz",
    password: "Ph126354",
    avatar: "https://avatars.dicebear.com/api/male/behrad.svg",
    address: {
      country: "ایران",
      city: "تهران",
      street: "خیابان ولیعصر",
      alley: "کوچه زمانی",
      number: 365,
      geo: {
        lat: "31.94",
        lng: "51.647778",
      },
    },
    phone: "+989145824151",
    website: "http://nanoran.org",
    company: "نانوران",
  },
  {
    id: 10,
    name: "امین رضوانی",
    username: "Amin",
    email: "amin@gmail.com",
    password: "Qw487965",
    avatar: "https://avatars.dicebear.com/api/male/amin.svg",
    address: {
      country: "ایران",
      city: "تبریز",
      street: "خیابان شمس تبریزی",
      alley: "کوچه رضوانی",
      number: 54,
      geo: {
        lat: "38.066667",
        lng: "46.3",
      },
    },
    phone: "+9371452585",
    website: "http://chaldora.org",
    company: "چالدورا",
  },
];
const Home = () => {
  return (
    <Container>
      <h1> my Json viewer</h1>
      <JsonSection object={test1} />
    </Container>
  );
};

const Container = styled.div`
  height: 93vh;
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Home;
