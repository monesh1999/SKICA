import React from "react";
import "./ListeningPage.css";

// Podcast Content
const podcasts = [
  {
    name: "The English We Speak",
    img: "https://ichef.bbci.co.uk/images/ic/1200xn/p0kwk38n.jpg",
    description: "Learn idioms and phrases from BBC.",
    rating: 4.8,
    link: "https://www.bbc.co.uk/programmes/p02pc9zn",
  },
  {
    name: "ESLPod",
    img: "https://tse2.mm.bing.net/th/id/OIP.QTdkhOfaF4W8XtmRQkRwewHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Real-life English conversations explained.",
    rating: 4.7,
    link: "https://www.eslpod.com/",
  },
  {
    name: "All Ears English",
    img: "https://tse1.mm.bing.net/th/id/OIP.nDdmKDa5hjNts9kbM6c5fAHaEK?cb=12&w=480&h=270&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Podcast for fluent, confident English.",
    rating: 4.6,
    link: "https://www.allearsenglish.com/",
  },
  {
    name: "Luke's English Podcast",
    img: "https://sa.nastafed.com/wp-content/uploads/2024/11/Luke-thompson-cover-small-copy.jpg",
    description: "Entertainment and learning combined.",
    rating: 4.7,
    link: "https://teacherluke.co.uk/",
  },
  {
    name: "BBC Learning English",
    img: "https://librum.io/wp-content/uploads/2020/04/unnamed.jpg",
    description: "News, phrases, and language learning.",
    rating: 4.8,
    link: "https://www.bbc.co.uk/learningenglish",
  },
  {
    name: "6 Minute English",
    img: "https://th.bing.com/th/id/R.19ed71ac84f7ad2bf5ee8c3f80e27346?rik=fsnJ%2bFdNG400Nw&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2fc50499ca451efe1377e6771cd414589291ca80df.jpg&ehk=qMOOvgNFKuRVIguzWkuwAWFNdVRex%2b7DRBRXk3btVDI%3d&risl=&pid=ImgRaw&r=0",
    description: "Quick English lessons by BBC.",
    rating: 4.7,
    link: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
  },
  {
    name: "Culips ESL Podcast",
    img: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/ca/bd/be/cabdbe46-9408-6ff9-dd4c-fa944d90d9f4/mza_9088968848133222748.jpg/1200x1200bb.jpg",
    description: "Fun and practical English listening.",
    rating: 4.5,
    link: "https://www.culips.com/",
  },
  {
    name: "Real English Conversations",
    img: "https://i.ytimg.com/vi/p4LIY9z3kfg/maxresdefault.jpg",
    description: "Real conversations to boost your listening.",
    rating: 4.6,
    link: "https://realenglishconversations.com/",
  },
  {
    name: "The English Classroom",
    img: "https://i.ytimg.com/vi/NEX8UN42kMg/maxresdefault.jpg",
    description: "English tips for daily conversations.",
    rating: 4.5,
    link: "https://www.youtube.com/watch?v=wnhxjLcWKX4",
  },
  {
    name: "Voice of America Learning English",
    img: "https://is1-ssl.mzstatic.com/image/thumb/PodcastSource115/v4/4d/78/11/4d781184-07b5-13e6-db12-6ca405f7e3fc/acfa93b4-5a59-4c0c-90f6-334c14c0b485.png/1200x630wf.png",
    description: "American English learning via news.",
    rating: 4.7,
    link: "https://learningenglish.voanews.com/",
  },
];

// Movies Content
const movies = [
  {
    name: "The Pursuit of Happyness",
    img: "https://upload.wikimedia.org/wikipedia/en/8/81/Poster-pursuithappyness.jpg",
    description: "Inspirational movie to improve listening and vocabulary.",
    rating: 4.8,
    link: "https://www.netflix.com/title/70044695",
  },
  {
    name: "Forrest Gump",
    img: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    description: "Classic film with clear dialogues.",
    rating: 4.9,
    link: "https://www.netflix.com/title/60000724",
  },
  {
    name: "The King’s Speech",
    img: "https://tse2.mm.bing.net/th/id/OIP.pxC89G0Qky8UICl3_Yn1EQAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Speech therapy themed movie.",
    rating: 4.8,
    link: "https://www.youtube.com/playlist?list=PLQMiRykNdb9hxTlZGV47mu0f72BLIYZ3X",
  },
  {
    name: "Dead Poets Society",
    img: "https://metadata-static.plex.tv/4/gracenote/441a886c8fd737dd3a223965994705b8.jpg",
    description: "Improve listening via classic English dialogues.",
    rating: 4.7,
    link: "https://www.hotstar.com/in/movies/deadpoetssociety/1260017844",
  },
  {
    name: "Good Will Hunting",
    img: "https://image.tmdb.org/t/p/original/3qkfrgpXNHdhB4sDGCpLxuS0JYP.jpg",
    description: "Emotional dialogues for comprehension practice.",
    rating: 4.8,
    link: "https://www.justwatch.com/in/movie/good-will-hunting",
  },
  {
    name: "Harry Potter Series",
    img: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/9050/1739444589050-i",
    description: "Popular series for everyday English.",
    rating: 4.9,
    link: "https://www.hotstar.com/in/movies/harry-potter-and-the-philosophers-stone/1971000398",
  },
  {
    name: "The Social Network",
    img: "https://tse1.mm.bing.net/th/id/OIP.PQ70YKb0SIDq1Rt5gfCDiwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Business and tech English dialogues.",
    rating: 4.7,
    link: "https://www.dailymotion.com/video/x9in1ss",
  },
  {
    name: "The Imitation Game",
    img: "https://wallpaperaccess.com/full/2512799.jpg",
    description: "Historical movie to improve listening skills.",
    rating: 4.8,
    link: "https://www.justwatch.com/in/movie/the-imitation-game",
  },
  {
    name: "Cast Away",
    img: "https://th.bing.com/th/id/R.c48aac2c5140894ed75be0ed86374c51?rik=ckewrZnzpySCdw&riu=http%3a%2f%2fimages1.fanpop.com%2fimages%2fimage_uploads%2fCast-Away-cast-away-1226032_1024_768.jpg&ehk=y%2bzxKMmW%2b4lFn6wiLdOuPJ%2bsHJ5yf2Payl6L15JIFIE%3d&risl=&pid=ImgRaw&r=0",
    description: "Clear dialogues with emotional context.",
    rating: 4.6,
    link: "https://www.youtube.com/watch?time_continue=1&v=jW6G1Fahfv4&embeds_referring_euri=https%3A%2F%2Fwww.bing.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.bing.com&source_ve_path=Mjg2NjY",
  },
  {
    name: "The Devil Wears Prada",
    img: "https://img10.hotstar.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7569/177569-v",
    description: "Modern conversational English.",
    rating: 4.7,
    link: "https://www.hotstar.com/in/movies/the-devil-wears-prada/1770000745/watch",
  },
];

// Webseries Content
const webseries = [
  {
    name: "Friends",
    img: "https://m.media-amazon.com/images/S/pv-target-images/c7fc75a423fc33698265a27fe446a41026f3c8642fd6c8706c43b897d2ffb3e6.jpg",
    description: "Learn everyday English in a fun way.",
    rating: 4.8,
    link: "https://www.netflix.com/title/70153404",
  },
  {
    name: "Sherlock",
    img: "https://es.web.img2.acsta.net/pictures/18/11/05/18/04/5429486.jpg",
    description: "Improve vocabulary and listening skills.",
    rating: 4.7,
    link: "https://www.airtelxstream.in/tv-shows/sherlock/LIONSGATEPLAY_TVSHOW_SHERLOCKY2010S",
  },
  {
    name: "The Crown",
    img: "https://fr.web.img4.acsta.net/pictures/16/10/18/22/22/401318.jpg",
    description: "British English, formal dialogues.",
    rating: 4.8,
    link: "https://www.netflix.com/title/80025678",
  },
  {
    name: "Stranger Things",
    img: "https://tse2.mm.bing.net/th/id/OIP.GD7nvI4PYbYZX5NGd4xZtAHaK-?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "American English with suspenseful dialogue.",
    rating: 4.7,
    link: "https://www.netflix.com/title/80057281",
  },
  {
    name: "Breaking Bad",
    img: "https://tse3.mm.bing.net/th/id/OIP.IjVZWTSd1UcavHSBKA1tAQHaKU?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Informal English, slang, and advanced vocabulary.",
    rating: 4.9,
    link: "https://www.netflix.com/title/70143836",
  },
  {
    name: "How I Met Your Mother",
    img: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/8298/1378298-i-15c370f17715",
    description: "Conversational and comedic English.",
    rating: 4.7,
    link: "https://www.hotstar.com/in/shows/how-i-met-your-mother/8323?search_query=How+I+Met+Your+Mother",
  },
  {
    name: "The Office (US)",
    img: "https://image.tmdb.org/t/p/original/8Nd0maUOvwwup1NXIKyEkYh2t4i.jpg",
    description: "Humorous conversational English.",
    rating: 4.8,
    link: "https://www.netflix.com/title/70136120",
  },
  {
    name: "Mindhunter",
    img: "https://tse3.mm.bing.net/th/id/OIP.bEX98vCcJgX4lg2Is1eBgwHaJQ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "British and American English in crime context.",
    rating: 4.7,
    link: "https://www.netflix.com/title/80114855",
  },
  {
    name: "Black Mirror",
    img: "https://tse2.mm.bing.net/th/id/OIP.dAPsfYCJSATjG1s_7_hTQAHaLH?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Tech and conversational English.",
    rating: 4.8,
    link: "https://www.netflix.com/title/70264888",
  },
  {
    name: "Big Bang Theory",
    img: "https://tse3.mm.bing.net/th/id/OIP.gv91_jUIcExPE2jMnM_AkAHaJH?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Modern scientific English and jokes.",
    rating: 4.7,
    link: "https://www.airtelxstream.in/tv-shows/the-big-bang-theory/AMAZON_PRIME_TVSHOW_amzn1.dv.gti.42a9f675-d2af-c185-ee16-84fc038ed8cd",
  },
];

const Section = ({ title, items }) => (
  <section className="glass section">
    <h2>{title}</h2>
    <div className="grid1">
      {items.map((item, index) => (
        <div
          className="card"
          key={index}
          onClick={() => window.open(item.link, "_blank")}
        >
          <img src={item.img} alt={item.name} />
          <div className="card-content">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="rating">⭐ {item.rating}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ListeningPage = () => {
  return (
    <div className="listening-page">
      <header className="listening-header">
        <h1>🎧 Improve Your English Listening</h1>
        <p>
          Learn English through podcasts, movies, and webseries. Click any item
          to watch or listen and enhance your comprehension and vocabulary.
        </p>
      </header>

      <Section title="🎙️ Podcasts" items={podcasts} />
      <Section title="🎬 Movies" items={movies} />
      <Section title="📺 Webseries" items={webseries} />

      <footer className="listening-footer">
        © 2025 <span>Skica</span> — All rights reserved.
      </footer>
    </div>
  );
};

export default ListeningPage;
