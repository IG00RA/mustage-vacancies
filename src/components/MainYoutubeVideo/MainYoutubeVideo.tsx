'use client';

import styles from './MainYoutubeVideo.module.css';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Icon from '@/helpers/Icon';

type MainYoutubeVideoProps = {
  videoID: string;
  children?: React.ReactNode;
};

export default function MainYoutubeVideo({
  videoID,
  children,
}: MainYoutubeVideoProps): JSX.Element {
  const t = useTranslations();
  const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };
  return (
    <div className={`${styles.description_container}`}>
      <h2 className={styles.description_header}>{t('Hero.video')}</h2>
      <div className={styles.video_wrap}>
        <iframe
          className={styles.video}
          src={`https://www.youtube.com/embed/${videoID}?autoplay=${
            showVideo ? '1' : '0'
          }&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        />
        {!showVideo && <div className={styles.video_box}></div>}
        <button
          type="button"
          className={`${styles.video_icon} ${
            showVideo && styles.video_icon_show
          }`}
          onClick={handleShowVideo}
        >
          <Icon name="icon-video" width={26} height={26} />
        </button>
      </div>
    </div>
  );
}
