import { Link, useNavigate } from "react-router-dom";
import { checkDateBeforeMonthToPresent } from "../../../Functions/helper";
import RateStars from "../MidComponents/RateStars";
import SvgIcon from "../MiniComponents/SvgIcon";
import styles from "./ProductCard.module.scss";

const ProductCard = ({
  product,
  customization = {
    stopHover: false,
    showDiscount: true,
    showFavIcon: true,
    showDetailsIcon: true,
    showRemoveIcon: false,
    showNewText: false,
  },
}) => {
  const {
    shortName,
    name,
    price,
    discount,
    afterDiscount,
    img,
    rate,
    votes,
    id,
    addedDate,
  } = product;
  const {
    stopHover,
    showDiscount,
    showFavIcon,
    showDetailsIcon,
    showRemoveIcon,
    showNewText,
  } = customization;
  const noHoverClass = stopHover ? styles.noHover : "";
  const hideDiscountClass = discount <= 0 || !showDiscount ? styles.hide : "";
  const hideNewClass = shouldHideNewWord();
  const navigateTo = useNavigate();

  function shouldHideNewWord() {
    return checkDateBeforeMonthToPresent(addedDate) || !showNewText
      ? styles.hide
      : "";
  }

  function navigateToProductDetails() {
    navigateTo(`/details/?product=${name.toLowerCase()}`);
  }

  return (
    <div className={`${styles.card} ${noHoverClass}`}>
      <div className={styles.productImg}>
        <img src={img} alt={name} title={name} />

        <div className={styles.layerContent}>
          {hideNewClass && (
            <div className={`${styles.discount} ${hideDiscountClass}`}>
              -{discount}%
            </div>
          )}

          <div className={`${styles.new} ${hideNewClass}`}>New</div>

          <div className={styles.icons}>
            {showFavIcon && (
              <a href="#" className={styles.iconHolder} title="Favorite">
                <SvgIcon name="heart" />
              </a>
            )}

            {showDetailsIcon && (
              <a href="#" className={styles.iconHolder} title="Details">
                <SvgIcon name="eye" />
              </a>
            )}

            {showRemoveIcon && (
              <button
                type="button"
                className={styles.iconHolder}
                title="Remove"
              >
                <SvgIcon name="trashCan" />
              </button>
            )}
          </div>

          <button type="button" className={styles.addToCartBtn}>
            <SvgIcon name="cart3" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>

      <section className={styles.productInfo}>
        <strong className={styles.productName}>
          <Link onClick={() => navigateToProductDetails()}>{name}</Link>
        </strong>
        <div className={styles.price}>
          ${afterDiscount}
          <del className={styles.afterDiscount}>${price}</del>
        </div>

        <div className={styles.rateContainer}>
          <RateStars rate={rate} />

          <span className={styles.numOfVotes}>({votes})</span>
        </div>
      </section>
    </div>
  );
};
export default ProductCard;
