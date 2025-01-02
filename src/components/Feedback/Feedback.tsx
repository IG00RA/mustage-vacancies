'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { feedbackItems as originalGalleryImages } from '@/data/data';
import styles from './Feedback.module.css';
import Button from '../Button/Button';
import TSvgMedium from '@/helpers/TSvgMedium';
import CSvg from '@/helpers/CSvg';
import { useEffect, useState } from 'react';
import Icon from '@/helpers/Icon';

interface FeedbackItem {
  img: string;
  span: string;
  head: string;
  text: string;
}

export default function Feedback() {
  const [groupedItems, setGroupedItems] = useState<FeedbackItem[][]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean[]>(
    Array(originalGalleryImages.length).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setLoadingImages(prev => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const groupItems = (
    items: FeedbackItem[],
    groupSize: number
  ): FeedbackItem[][] => {
    const grouped: FeedbackItem[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  useEffect(() => {
    const updateGroups = () => {
      const screenWidth = window.innerWidth;
      const groupSize = screenWidth >= 768 && screenWidth < 1250 ? 4 : 3;
      setGroupedItems(groupItems(originalGalleryImages, groupSize));
    };
    updateGroups();

    window.addEventListener('resize', updateGroups);

    return () => {
      window.removeEventListener('resize', updateGroups);
    };
  }, []);
  return (
    <section id="feedback" className={styles.feedback}>
      <div className={styles.container}>
        <h2 className={styles.header}>
          Spätná väzba od{' '}
          <span>
            rodi
            <CSvg />
            ov
          </span>{' '}
          a odborníkov
        </h2>
        <div className={styles.paginationWrap}>
          <div className={styles.prev}></div>
          <div className={styles.pagination}></div>
          <div className={styles.next}></div>
        </div>
        <Swiper
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          pagination={{
            clickable: true,
            el: `.${styles.pagination}`,
          }}
          spaceBetween={32}
          className={styles.gallerySlider}
          modules={[Navigation, Pagination]}
          loop={true}
        >
          {groupedItems.map((group, index) => (
            <SwiperSlide key={index} className={styles.galleryItem}>
              {group.map((item, subIndex) => (
                <div key={subIndex} className={styles.card}>
                  <div className={styles.imgWrap}>
                    {loadingImages[index] && (
                      <div className={styles.loader}>
                        <Icon
                          name="icon-load"
                          width={55}
                          height={55}
                          color="#ffb088"
                        />
                      </div>
                    )}
                    <Image
                      src={item.img}
                      alt={item.head}
                      className={styles.sliderImage}
                      onLoad={() => handleImageLoad(index)}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                  <p className={styles.cardText}>{item.text}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardSpan}>{item.span}</span>
                    <h4 className={styles.cardHead}>{item.head}</h4>
                  </div>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>

        <Button>
          Objedna
          <TSvgMedium color="#ffffff" /> sadu
        </Button>
      </div>
    </section>
  );
}
