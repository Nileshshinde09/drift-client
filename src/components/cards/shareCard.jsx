import DriftLogo from "../../assets/Applogo/driftLogo.png"
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import {
    FacebookIcon,EmailIcon, InstapaperIcon, TelegramIcon, XIcon, WhatsappIcon, LinkedinIcon
} from "react-share";
import { Clipboard } from "lucide-react";
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Button } from "../ui/button";
import CopyToClipboard from "react-copy-to-clipboard";
import { Separator } from "../ui/separator";
import { useRef } from "react";
const shareCard = ({ logoImage, username = "@striver", url = "https://medium.com/@nileshshindeofficial" }) => {
    
    const qrRef = useRef(null);

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${ username|| prompt('Enter the name for the QR code file:')|| 'qrcode'}.png`;
        link.click();
    };
    return (
        <div className="w-full">
            <div className="flex justify-center" onClick={handleDownload} ref={qrRef}>
                <QRCode qrStyle={"dots"} removeQrCodeBehindLogo eyeColor={'gray'} logoWidth={50} logoHeight={40} fgColor='white' bgColor="black" enableCORS logoImage={logoImage || DriftLogo} value={url || null} />
            </div>
            <div>
                <h4 className="text-center scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight">
                    {username}
                </h4>
            </div>
            <div className="flex space-x-2 p-3"><div />
                <InstapaperShareButton url={url}><InstapaperIcon className="rounded-full w-10 h-10" /></InstapaperShareButton>
                <TelegramShareButton url={url}><TelegramIcon className="rounded-full w-10 h-10" /></TelegramShareButton>
                <TwitterShareButton url={url}><XIcon className="rounded-full w-10 h-10" /></TwitterShareButton>
                <WhatsappShareButton url={url}><WhatsappIcon className="rounded-full w-10 h-10" /></WhatsappShareButton>
                <FacebookShareButton url={url}><FacebookIcon className="rounded-full w-10 h-10" /></FacebookShareButton>
                <LinkedinShareButton url={url}><LinkedinIcon className="rounded-full w-10 h-10" /></LinkedinShareButton>
                <EmailShareButton url={url}><EmailIcon className="rounded-full w-10 h-10" /></EmailShareButton>
            </div>
            <div className="border-b pb-2" />
            <div className="flex">
                <CopyToClipboard text={String(url)} className="mx-auto mt-4 w-full text-wrap">
                    <Button className="w-full">{String(url)} <Separator orientation="vertical" className="mx-1" /> <Clipboard className="px-1"/></Button>
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default shareCard
