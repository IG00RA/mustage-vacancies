import creo from '../img/hero/creo.svg';
import proxy from '../img/hero/proxy.svg';
import store from '../img/hero/store.svg';
import logo_link from '../img/hero/logo_link.svg';
import insta from '../img/hero/insta.webp';
import tg_channel from '../img/hero/tg_channel.webp';
import tg_chat from '../img/hero/tg_chat.webp';
import tik from '../img/hero/tik.webp';
import youtube from '../img/hero/youtube.webp';

export const offerItems = [
  {
    header: 'Offer.blockHeader.first',
    logo: 'icon-calendar',
    logo_hov: 'icon-calendar_hov',
  },
  {
    header: 'Offer.blockHeader.second',
    logo: 'icon-clock',
    logo_hov: 'icon-clock_hov',
  },
  {
    header: 'Offer.blockHeader.third',
    logo: 'icon-card',
    logo_hov: 'icon-card_hov',
  },
  {
    header: 'Offer.blockHeader.fourth',
    logo: 'icon-grow',
    logo_hov: 'icon-grow_hov',
  },
  {
    header: 'Offer.blockHeader.fifth',
    logo: 'icon-case',
    logo_hov: 'icon-case_hov',
  },
];

export const menuItems = [
  { label: 'Footer.menu.offer', href: '#offer' },
  { label: 'Footer.menu.vacancies', href: '#vacancies' },
  { label: 'Footer.menu.contacts', href: '#contacts' },
];

export const socialItems = [
  { icon: 'icon-tg_footer', link: 'https://t.me/usaffiliate' },
  { icon: 'icon-youtube_footer', link: 'https://www.youtube.com/@usaffiliate' },
  { icon: 'icon-tik_footer', link: 'https://www.tiktok.com/@mustage.io' },
];

export const heroItems = [
  {
    text: 'Про Mustage Team',
    icon: logo_link,
    link: 'https://mustage.site/',
  },
  {
    text: 'Mustage Academy',
    icon: logo_link,
    link: 'https://mustage.site/',
  },
  {
    text: 'YouTube channel',
    icon: youtube,
    link: 'https://www.youtube.com/@usaffiliate',
  },
  {
    text: 'Instagram',
    icon: insta,
    link: 'https://www.instagram.com/mustage.team/',
  },
  {
    text: 'Tik-Tok',
    icon: tik,
    link: 'https://www.tiktok.com/@mustage.io',
  },
  {
    text: 'Telegram-channel',
    icon: tg_channel,
    link: 'https://t.me/mustage_channel',
  },
  {
    text: 'Telegram-chat',
    icon: tg_chat,
    link: 'https://t.me/+4oFlq242zzszZmQ6',
  },
  {
    text: 'Mustage Store',
    icon: store,
    link: 'https://mustage.site/',
  },
  {
    text: 'Mustage Proxy',
    icon: proxy,
    link: 'https://proxy.mustage.io/',
  },
  {
    text: 'Mustage Creo',
    icon: creo,
    link: 'https://mustage.io/creo',
  },
];
