import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/components/InstaFeed.module.css";

export default function InstaFeed() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    //https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
    //https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-profiles-and-media
    // Token de longa dura 60 dias

    const executeAsync = async () => {
      const url =
        "https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,thumbnail_url,timestamp&access_token=IGQVJWTjBrVDZAIQVZAIVnluTmxqR050QzZABOTEzaG9tUnFvYVg0VE9nV1p0VWpOeEJXcG9MNHQ3N196RHYzbnlSdFRQWkM2R2RrYm84M2x6OF9NWG56R1U5RVdWSFhGQWZAPcTJyZA0R5M0ZApNU5DRTBLbHNZAaGhkaV9rWjBN";

      const result = await axios.get(url);
      const lastPosts = [
        result.data.data[0],
        result.data.data[1],
        result.data.data[2],
      ];

      setPosts(lastPosts);
    };
    executeAsync();
  }, []);

  if (!posts) return null;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Acompanhe nas redes sociais</h3>
        <p className={styles.subtitle}>Últimas postagens</p>
        <div className={styles.postList}>
          {posts &&
            posts.map((post) => {
              return (
                <div
                  key={post.id}
                  onClick={() => window.open(post.permalink, "_blank")}
                  className={styles.postContainer}
                >
                  <div
                    title={"filipeleonelbatista"}
                    style={{
                      background: `url(${post.media_url}) no-repeat center center`,
                      width: "100%",
                      height: "20rem",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className={styles.postFooter}>
                    <div
                      title={"filipeleonelbatista"}
                      style={{
                        background: `url(https://desenvolvedordeaplicativos.vercel.app/_next/static/images/banner-image-1-a66ee6f73d07bb1017577a288c87ef6a.png) no-repeat center center`,
                        borderRadius: "50%",
                        width: "2.4rem",
                        height: "2.4rem",
                        backgroundSize: "cover",
                      }}
                    ></div>
                    <div className={styles.postFooterContent}>
                      <strong className={styles.usernameFooter}>
                        filipeleonelbatista
                      </strong>
                      <p className={styles.descriptionFooter}>
                        {post.caption.substr(0, 50)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
