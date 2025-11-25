import React, { useState } from 'react'
import FooterFB from "@/assets/icon/icon-fb.svg";
import FooterIG from "@/assets/icon/icon-ig.svg";
import FooterLine from "@/assets/icon/icon-Line.svg";
import SiderFB from "@/assets/icon/Facebook.png";
import SiderIG from "@/assets/icon/Instagram.png";
import SiderLine from "@/assets/icon/Line.svg";
import FooterShare from "@/assets/icon/icon-share.png";
import FacebookShare from "@/assets/icon/facebook-share.svg";
import LineShare from "@/assets/icon/line-share.svg";
import XShare from "@/assets/icon/x-share.svg";
import WhatsappShare from "@/assets/icon/whatsapp-share.svg";
import TelegramShare from "@/assets/icon/telegram-share.svg";


const ShareModal = ({ show, onClose, url }) => {
  if (!show) return null;

  // 分享選項列表
  const shareOptions = [
    { name: "Facebook", icon: FacebookShare, handler: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank') },
    { name: "Line", icon: LineShare, handler: () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, '_blank') },
    { name: "X", icon: XShare, handler: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank') },
    { name: "WhatsApp", icon: WhatsappShare, handler: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank') },
    { name: "Telegram", icon: TelegramShare, handler: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank') },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("連結已複製！"); // 這裡可以用更優雅的 Toast 提示替換
      onClose();
    }).catch(err => {
      console.error('複製失敗:', err);
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm md:max-w-md" onClick={e => e.stopPropagation()}>
        {/* 標題與關閉按鈕 */}
        <div className="p-4 border-b border-[#CCCCCC] my-4 mx-6 flex justify-between items-center relative">
          <h3 className="absolute top-0 left-0 text-base font-bold text-[#1B7183]">分享</h3>
          {/* 圖片中的 X 關閉按鈕 */}
          <button className="absolute -top-2 -right-4 w-5 h-5 rounded-full bg-[#1B7183] flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e8f9b] cursor-pointer" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 分享圖標區 */}
        <div className="px-5 pb-5 pt-2 flex justify-between items-center space-x-2">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              className="flex flex-col items-center group min-w-[60px]"
              onClick={option.handler}
            >
              {/* 圖標部分：保持原圖比例和顏色 */}
              <img src={option.icon} alt={option.name} className="w-14 h-14 cursor-pointer" />
              <span className="text-xs mt-1 text-gray-500 group-hover:text-[#1B7183] cursor-pointer">{option.name}</span>
            </button>
          ))}
        </div>

        {/* 連結與複製按鈕 */}
        <div className="px-6 pt-0 pb-5">
          <div className="flex border mt-2 border-gray-300 rounded-lg overflow-hidden bg-white">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-grow p-2 text-sm text-gray-500 truncate bg-transparent border-none focus:outline-none"
            />
            <button
              // 圖片中的複製按鈕顏色為深綠色，使用 Tailwind 模擬
              className="w-[60px] h-[30px] rounded-[19.79px] bg-[#1B7183] text-white px-4 text-sm font-medium transition-colors flex-shrink-0 mx-2 my-1 cursor-pointer"
              onClick={handleCopy}
            >
              複製
            </button>
          </div>
        </div>

        <hr className={`border-t border-solid border-[#CCCCCC] mx-6 mb-6`} />
      </div>
    </div>
  );
};

/**
 * LinkButton - 可重用的社群媒體連結按鈕元件
 * 
 * @component
 * @description 一個通用的連結按鈕元件，支援多種社群媒體圖標和自定義樣式。
 * 此元件提供了靈活的選項來控制連結行為、圖標類型和視覺樣式。
 * 當沒有提供 href 時，會根據圖標類型自動連結到對應的社群媒體官網。
 * 
 * @example
 * // 基本使用範例 - 自動連結到 Facebook
 * <LinkButton 
 *   iconType="footer-fb"
 *   alt="Facebook"
 * />
 * 
 * @example
 * // 自動連結到 Instagram，自定義樣式
 * <LinkButton 
 *   iconType="sider-ig"
 *   alt="Instagram"
 *   size="w-10 h-10"
 *   linkClass="hover:scale-125 transition-all duration-300"
 *   imgClass="opacity-75 hover:opacity-100"
 * />
 * 
 * @example
 * // 自定義連結（覆蓋預設行為）
 * <LinkButton 
 *   href="https://www.facebook.com/mycompany"
 *   iconType="footer-fb"
 *   alt="我們的 Facebook 專頁"
 * />
 * 
 * @example
 * // 內部連結
 * <LinkButton 
 *   href="/about"
 *   iconType="footer-fb"
 *   alt="關於我們"
 *   target="_self"
 * />
 * 
 * @param {Object} props - 元件屬性
 * @param {string} [props.href] - 連結的目標 URL。若不提供，將根據圖標類型自動設定
 * @param {"footer-fb"|"footer-ig"|"sider-fb"|"sider-ig"} [props.iconType="footer-fb"] - 圖標類型，決定要顯示哪個社群媒體圖標
 * @param {string} [props.alt="連結"] - 圖片的替代文字，用於無障礙功能
 * @param {string} [props.size="w-6 h-6"] - 圖標的尺寸類別，使用 Tailwind CSS 的 width 和 height 類別
 * @param {string} [props.linkClass="hover:scale-110 transition-transform"] - 連結元素的 CSS 類別
 * @param {string} [props.imgClass=""] - 圖片元素的額外 CSS 類別
 * @param {"_blank"|"_self"|"_parent"|"_top"} [props.target="_blank"] - 連結的開啟方式
 * @param {Function} [props.onClick=null] - 點擊事件處理函式
 * @param {React.ReactNode} [props.children] - 子元素
 * 
 * @returns {React.ReactElement} 返回一個包含圖標的連結元素
 */
const LinkButton = ({ 
  href, 
  iconType = "footer-fb", 
  alt = "連結",
  size = "w-6 h-6",
  linkClass = "hover:scale-110 transition-transform",
  imgClass = "",
  target = "_blank",
  onClick = null,
  children
}) => {

  // 新增 State 來控制分享彈窗的顯示
  const [showShareModal, setShowShareModal] = useState(false);

  /**
   * 圖標對應表
   * @constant
   * @type {Object.<string, string>}
   * @description 將圖標類型字串對應到實際的圖片檔案
   */
  const iconMap = {
    "footer-fb": FooterFB,
    "footer-ig": FooterIG,
    "footer-line": FooterLine,
    "sider-fb": SiderFB,
    "sider-ig": SiderIG,
    "sider-line": SiderLine,
    "footer-share": FooterShare
  };

  /**
   * 取得對應的圖標
   * @constant
   * @type {string}
   * @description 根據 iconType 從對應表中取得圖標，若找不到則使用預設的 FooterFB
   */
  const icon = iconMap[iconType] || FooterFB;

  // 定義要分享的 URL
  const SHARE_URL = "https://k-evmap.klcg.gov.tw";
  
  /**
   * 自動設定連結
   * @constant
   * @type {string}
   * @description 如果沒有提供 href，則根據圖標類型自動設定連結
   */
  const finalHref = href || (iconType === "footer-share" ? "#" : (() => {
    // 判斷是 Facebook、Line 還是 Instagram
    if (iconType.includes('fb')) {
      return 'https://www.facebook.com/ilovekeelung';
    } else if (iconType.includes('line')) {
      return 'https://line.me/R/ti/p/@914kgwbz?oat_content=url&ts=04221721';
    } else {
      return 'https://www.instagram.com/embracekeelung/';
    }
  })());

  /**
   * 處理點擊事件
   * @param {React.MouseEvent} e - 點擊事件
   */
  const handleClick = (e) => {
    if (iconType === "footer-share") {
      e.preventDefault(); // 阻止預設的連結行為
      setShowShareModal(true); // 顯示分享彈窗
    }

    // 執行外部傳入的 onClick 函式 (如果有的話)
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <>
      <a 
        href={finalHref} 
        className={linkClass}
        target={iconType === "footer-share" ? "_self" : target} // 分享按鈕的 target 設為 _self 或移除
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={handleClick} // 使用新的 handleClick 處理點擊
      >
        <img 
          src={icon} 
          alt={alt} 
          className={`${size} ${imgClass}`} 
        />
        {children}
      </a>
      
      {/* 渲染分享彈窗，只有在 iconType 為 footer-share 時才有用 */}
        {iconType === "footer-share" && (
          <ShareModal 
            show={showShareModal} 
            onClose={() => setShowShareModal(false)}
            url={SHARE_URL}
          />
      )}
    </>
  )
}

export default LinkButton