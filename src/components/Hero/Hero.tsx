'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Hero.module.css';
import { useTranslations } from 'next-intl';
import { heroItems as originalGalleryImages } from '@/data/data';
import logo from '../../img/hero/logo.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeroItem {
  icon: string;
  text: string;
  link: string;
}
export default function Hero() {
  const t = useTranslations();
  const [groupedItems, setGroupedItems] = useState<HeroItem[][]>([]);

  const groupItems = (items: HeroItem[], groupSize: number): HeroItem[][] => {
    const grouped: HeroItem[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  useEffect(() => {
    const updateGroups = () => {
      const screenWidth = window.innerWidth;
      let groupSize = 4;
      screenWidth >= 768 && screenWidth <= 1023 && (groupSize = 6);
      screenWidth >= 1024 && (groupSize = 10);

      setGroupedItems(groupItems(originalGalleryImages, groupSize));
    };
    updateGroups();

    window.addEventListener('resize', updateGroups);

    return () => {
      window.removeEventListener('resize', updateGroups);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.header_wrap}>
          <Image
            src={logo}
            alt="Mustage logo"
            className={styles.logo}
            width={0}
            height={0}
            sizes="100vw"
          />
          <h1 className={styles.header}>{t('Hero.header')}</h1>
        </div>
        <div className={styles.back}></div>
        <h2 className={styles.logo_text}>{t('Hero.text')}</h2>
        <div className={styles.block_wrap}>
          <div className={styles.first_block}>
            <h3 className={styles.first_block_header}>
              {t('Hero.blocHeader.first')}
            </h3>
            <p className={styles.first_block_text}>
              {t('Hero.blockText.first')}
            </p>
          </div>
          <div className={styles.second_block}>
            <h3 className={styles.second_block_header}>
              {t('Hero.blocHeader.second')}
            </h3>
            <p className={styles.second_block_text}>
              {t('Hero.blockText.second')}
            </p>
          </div>
        </div>
        <div className={styles.main_nav_wrap}>
          <p className={styles.list_header}>{t('Hero.listHeader')}</p>
          <div className={styles.nav_wrap}>
            <div className={styles.prev}></div>
            <div className={styles.next}></div>
          </div>
        </div>
        <Swiper
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          pagination={false}
          spaceBetween={0}
          className={styles.slider}
          modules={[Navigation, Pagination]}
          loop={true}
        >
          {groupedItems.map((group, index) => (
            <SwiperSlide key={index} className={styles.list}>
              {group.map((item, subIndex) => (
                <div key={subIndex} className={styles.list_item}>
                  <a
                    className={styles.list_link}
                    href={item.link}
                    target="_blank"
                  >
                    <Image
                      src={item.icon}
                      alt={item.text}
                      className={styles.icon}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                    <p className={styles.list_text}>{item.text}</p>
                  </a>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
