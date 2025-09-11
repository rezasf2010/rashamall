import {
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ product }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/products/${product.main_category}/${product.sub_category}/${product._id}`;

  return (
    <div className="flex w-full gap-6 items-center py-2 justify-center md:justify-start lg:justify-center">
      <h3 className="font-semibold text-center text-sm">این کالا را به اشتراک بگذارید</h3>
      <div className="flex gap-3 justify-center">
        <WhatsappShareButton url={shareUrl} title={product.name} separator=":: ">
          <WhatsappIcon size={30} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={product.name}
          body={`این محصول را ببینید: ${shareUrl}`}
        >
          <EmailIcon size={30} round={true} />
        </EmailShareButton>

        <TelegramShareButton url={shareUrl} title={product.name}>
          <TelegramIcon size={30} round={true} />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
