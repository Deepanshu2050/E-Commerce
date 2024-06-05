import { useTranslation } from "react-i18next";
import RateStars from "../../Shared/MidComponents/RateStars/RateStars";
import s from "./ProductFirstInfos.module.scss";

const ProductFirstInfos = ({ data }) => {
  const { shortName, price, votes, rate } = data;
  const { t } = useTranslation();

  function translateProduct(key, uppercase, dynamicData = {}) {
    const shortNameKey = shortName.replaceAll(" ", "");
    const productTrans = `products.${shortNameKey}`;
    const translateText = t(`${productTrans}.${key}`, dynamicData);
    return uppercase ? translateText.toUpperCase() : translateText;
  }

  return (
    <section className={s.firstInfos}>
      <h2 className={s.productName}>{translateProduct("name", true)}</h2>

      <div className={s.rateAndReviews}>
        <RateStars rate={rate} />
        <span className={s.reviews}>{t("detailsPage.reviews", { votes })}</span>

        <div className={s.verticalLine} />

        <span className={s.greenText}>{t("detailsPage.inStock")}</span>
      </div>

      <span className={s.price} aria-label={`Price: $${price}`}>
        ${price}
      </span>

      <p className={s.description}>{translateProduct("description")}</p>
    </section>
  );
};
export default ProductFirstInfos;
