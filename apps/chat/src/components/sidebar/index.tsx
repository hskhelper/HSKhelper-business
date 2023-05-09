"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { IconButton } from "@/components/button";
import { ChatList } from "@/components/chat/chat-list";
import { Loading } from "@/components/loading";
import { useSwitchTheme } from "@/hooks/switch-theme";
import { showAnnouncement } from "@/hooks/use-notice";
import { useChatStore, useSettingStore } from "@/store";
import { isMobileScreen } from "@/utils/utils";

import AddIcon from "@/assets/icons/add.svg";
import AnnouncementIcon from "@/assets/icons/announcement.svg";
import Instagram from "@/assets/icons/instagram.svg";
import CloseIcon from "@/assets/icons/close.svg";
import SettingsIcon from "@/assets/icons/settings.svg";


import FacebookIcon from "@/assets/icons/facebook.svg";
import WechatIcon from "@/assets/icons/wechat.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import TiktokIcon from "@/assets/icons/tiktok.svg";
import VkIcon from "@/assets/icons/vk.svg";
import styles from "@/styles/module/home.module.scss";

import Locale from "@/locales";

const wechatOA = process.env.NEXT_PUBLIC_WECHAT_OA;

/**
 * 修复水合错误
 */
const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export function Sidebar({ children }: { children: React.ReactNode }) {
  // 侧边栏是否展开
  const [showSideBar, setShowSideBar] = useChatStore((state) => [
    state.showSideBar,
    state.setShowSideBar,
  ]);

  // 对话
  const [createNewSession, currentIndex, removeSession] = useChatStore(
    (state) => [
      state.newSession,
      state.currentSessionIndex,
      state.removeSession,
    ]
  );

  // 是否加载中
  const loading = !useHasHydrated();

  // 设置
  const config = useSettingStore((state) => state.config);
  const tightBorder = useSettingStore((state) => state.tightBorder);

  // 暗色模式切换
  useSwitchTheme();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`${
        tightBorder && !isMobileScreen()
          ? styles["tight-container"]
          : styles.container
      }`}
    >
      <div
        className={styles.sidebar + ` ${showSideBar && styles["sidebar-show"]}`}
      >
        <div className={styles["sidebar-header"]}>
          <div className={styles["sidebar-title"]}>{Locale.Index.Title}</div>
            <div className={styles["sidebar-sub-title"]}>
              {Locale.Index.SubTitle}
            </div>
          <div className={styles["sidebar-logo"]}>
            <Instagram />
          </div>

          <div className={styles["sidebar-icons"]}>
            {/* 在这里添加6个带有超链接的图标 */}
            <div className={styles["sidebar-icons"]}>
              <a href="https://www.facebook.com/groups/211092064722868">
                <FacebookIcon />
              </a>
              <a href="https://youtube.com/@HSKhelper">
                <YoutubeIcon />
              </a>
              <a href="https://www.tiktok.com/@hskhelper">
                <TiktokIcon />
              </a>
              <a href="https://twitter.com/HSKhelper">
                <TwitterIcon />
              </a>
              <a href="https://vk.com/hsktop">
                <VkIcon />
              </a>
              <a href="https://www.instagram.com/hskhelper.top">
                <InstagramIcon />
              </a>
              <a href="https://mp.weixin.qq.com/s/mxFTwpadw_HAFoo8orBqPw">
                <WechatIcon />
              </a>

            </div>
          </div>

        </div>

        <div
          className={styles["sidebar-body"]}
          onClick={() => {
            setShowSideBar(false);
          }}
        >
          <ChatList />
        </div>

        <div className={styles["sidebar-tail"]}>
          <div className={styles["sidebar-actions"]}>
            <div className={styles["sidebar-action"] + " " + styles.mobile}>
              <IconButton
                icon={<CloseIcon />}
                onClick={() => {
                  if (confirm(Locale.Home.DeleteChat)) {
                    removeSession(currentIndex);
                  }
                }}
              />
            </div>
            <div className={styles["sidebar-action"]}>
              <IconButton
                icon={<SettingsIcon />}
                onClick={() => {
                  router.push("/settings");
                  setShowSideBar(false);
                }}
              />
            </div>
            {/*TODO add about us*/}
            <div className={styles["sidebar-action"]}>
              <IconButton
                icon={<AnnouncementIcon />}
                onClick={showAnnouncement}
              />
            </div>
          </div>
          <div>
            <IconButton
              icon={<AddIcon />}
              text={Locale.Home.NewChat}
              onClick={() => {
                createNewSession();
                setShowSideBar(false);
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles["window-content"]}>{children}</div>
    </div>
  );
}
