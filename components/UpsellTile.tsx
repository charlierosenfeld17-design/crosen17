import React from 'react';

interface VariantOption {
  value: string;
  label: string;
}

interface UpsellTileProps {
  productId: string;
  productTitle: string;
  itemUrl: string;
  imageUrl?: string;
  altText?: string;
  rating?: number;
  reviewCount?: number;
  oldPrice?: string;
  newPrice: string;
  selectedVariantId: string;
  selectedVariantLabel?: string;
  variantOptions: VariantOption[];
  addButtonText: string;
  addLoading: boolean;
  onAddClick: (productId: string, variantId: string) => void;
  onVariantChange?: (variantId: string) => void;
}

export default function UpsellTile(props: UpsellTileProps) {
  const fullStars = Math.floor(props.rating || 0);
  const partialStar = (props.rating || 0) % 1;
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

  return (
    <div
      className="upcart-internal-component-upsell-tile upcart-public-component-upsell-tile"
      data-internal-properties={`addLoading=${props.addLoading};productId=${props.productId};hasMultipleVariants=${props.variantOptions.length > 1}`}
    >
      {/* Decorative accent line */}
      <div className="upcart-internal-component-upsell-tile__accent upcart-public-component-upsell-tile__accent" />

      <div className="upcart-internal-component-upsell-tile__layout upcart-public-component-upsell-tile__layout">
        {/* Product image */}
        <a
          href={props.itemUrl}
          className="upcart-internal-component-upsell-tile__image-link upcart-public-component-upsell-tile__image-link"
        >
          <div className="upcart-internal-component-upsell-tile__image-container upcart-public-component-upsell-tile__image-container">
            {props.imageUrl ? (
              <img
                src={props.imageUrl}
                alt={props.altText}
                className="upcart-internal-component-upsell-tile__image upcart-public-component-upsell-tile__image"
              />
            ) : (
              <div className="upcart-internal-component-upsell-tile__image-placeholder upcart-public-component-upsell-tile__image-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
            {props.oldPrice && (
              <span className="upcart-internal-component-upsell-tile__badge upcart-public-component-upsell-tile__badge">
                SALE
              </span>
            )}
          </div>
        </a>

        {/* Product details */}
        <div className="upcart-internal-component-upsell-tile__info upcart-public-component-upsell-tile__info">
          <a
            href={props.itemUrl}
            className="upcart-internal-component-upsell-tile__title-link upcart-public-component-upsell-tile__title-link"
          >
            <h3 className="upcart-internal-component-upsell-tile__title upcart-public-component-upsell-tile__title">
              {props.productTitle}
            </h3>
          </a>

          {props.rating && props.reviewCount && (
            <div className="upcart-internal-component-upsell-tile__rating-row upcart-public-component-upsell-tile__rating-row">
              <div className="upcart-internal-component-upsell-tile__stars upcart-public-component-upsell-tile__stars">
                {Array.from({ length: fullStars }, (_, i) => (
                  <svg key={`full-${i}`} className="upcart-internal-component-upsell-tile__star upcart-internal-component-upsell-tile__star--full" viewBox="0 0 20 20">
                    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.18l-4.77 2.54.91-5.33L2.27 6.62l5.34-.78L10 1z" />
                  </svg>
                ))}
                {partialStar > 0 && (
                  <svg key="partial" className="upcart-internal-component-upsell-tile__star upcart-internal-component-upsell-tile__star--partial" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id={`star-grad-${props.productId}`}>
                        <stop offset={`${partialStar * 100}%`} stopColor="currentColor" />
                        <stop offset={`${partialStar * 100}%`} stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.18l-4.77 2.54.91-5.33L2.27 6.62l5.34-.78L10 1z"
                      fill={`url(#star-grad-${props.productId})`}
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </svg>
                )}
                {Array.from({ length: emptyStars }, (_, i) => (
                  <svg key={`empty-${i}`} className="upcart-internal-component-upsell-tile__star upcart-internal-component-upsell-tile__star--empty" viewBox="0 0 20 20">
                    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.18l-4.77 2.54.91-5.33L2.27 6.62l5.34-.78L10 1z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                ))}
              </div>
              <span className="upcart-internal-component-upsell-tile__review-count upcart-public-component-upsell-tile__review-count">
                ({props.reviewCount})
              </span>
            </div>
          )}

          <div className="upcart-internal-component-upsell-tile__price-row upcart-public-component-upsell-tile__price-row">
            <span
              className="upcart-internal-component-upsell-tile__price upcart-public-component-upsell-tile__price"
              dangerouslySetInnerHTML={{ __html: props.newPrice }}
              data-upcart-chunk="upsell-new-price"
            />
            {props.oldPrice && (
              <span
                className="upcart-internal-component-upsell-tile__price-compare-at upcart-public-component-upsell-tile__price-compare-at"
                dangerouslySetInnerHTML={{ __html: props.oldPrice }}
                data-upcart-chunk="upsell-old-price"
              />
            )}
          </div>

          <div
            className="upcart-internal-component-upsell-tile__actions upcart-public-component-upsell-tile__actions"
            data-internal-properties={`addLoading=${props.addLoading}`}
          >
            {props.selectedVariantLabel && (
              <div className="upcart-internal-component-upsell-tile__variant-select-wrapper upcart-public-component-upsell-tile__variant-select-wrapper">
                <select
                  className="upcart-internal-component-upsell-tile__variant-select upcart-public-component-upsell-tile__variant-select"
                  value={props.selectedVariantId}
                  onChange={(e) => {
                    if (props.onVariantChange) props.onVariantChange(e.target.value);
                  }}
                  disabled={props.addLoading}
                >
                  {props.variantOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <svg className="upcart-internal-component-upsell-tile__variant-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 8l4 4 4-4" />
                </svg>
              </div>
            )}

            <button
              className="upcart-internal-component-upsell-tile__add-button upcart-public-component__button"
              onClick={() => props.onAddClick(props.productId, props.selectedVariantId)}
              disabled={props.addLoading}
            >
              {props.addLoading ? (
                <div className="upcart-internal-component-upsell-tile__loader upcart-public-component-loader">
                  <span /><span /><span />
                </div>
              ) : (
                <>
                  <span>{props.addButtonText}</span>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="upcart-internal-component-upsell-tile__add-icon">
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
