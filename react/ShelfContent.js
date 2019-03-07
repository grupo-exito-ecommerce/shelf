import PropTypes from "prop-types";
import { path } from "ramda";
import classnames from 'classnames';
import React, { Component } from "react";
import { getGapPaddingValues } from "./paddingEnum";
import { Slider, SliderContainer, Slide, Dots } from "vtex.slider";
import { IconCaret } from 'vtex.dreamstore-icons';
import { NoSSR } from 'vtex.render-runtime';
import ScrollTypes from "./ScrollTypes";
import ShelfItem from "./ShelfItem";

import shelf from "./shelf.css";
/**
 * ShelfContent Component. Executes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
class ShelfContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0
    };
  }

  handleSlideChange = i => {
    this.setState({ currentSlide: i });
  };

  arrowRender = ({ orientation, onClick }) => {
    const rootClasses = classnames('dib absolute z-1 pointer', shelf.arrow, {
      'left-0': orientation === 'left',
      'right-0': orientation === 'right'
    })

    return (
      <div className={rootClasses} onClick={onClick}>
        <IconCaret orientation={orientation} size={30} />
      </div>
    )
  }

  render() {
    const { currentSlide } = this.state;
    const { summary, products } = this.props;

    const perPage = {
      1300: 5,
      1200: 4,
      900: 3,
      400: 1
    };

    if (!products) {
      return null
    }

    return (
      <div className="vtex-shelf__content flex justify-center">
        <SliderContainer className="w-100 mw9 pv5">
          <Slider
            perPage={perPage}
            onChangeSlide={this.handleSlideChange}
            currentSlide={currentSlide}
            arrowRender={this.arrowRender}
          >
            {products.map((item, index) => (
              <Slide
                className="justify-center vtex-shelf__slide pa4"
                key={path(['productId'], item) || index}
                defaultWidth={281}
              >
                <ShelfItem item={item} summary={summary} />
              </Slide>
            ))}
          </Slider>
          <NoSSR>
            <Dots
              showDotsPerPage
              perPage={perPage}
              currentSlide={currentSlide}
              totalSlides={products.length}
              onChangeSlide={this.handleSlideChange}
              classes={{
                root: 'bottom-1',
                notActiveDot: 'bg-muted-3',
                dot: 'h1 w1 mh2 mv0 pointer br-100',
                activeDot: 'bg-muted-1'
              }}
            />
          </NoSSR>
        </SliderContainer>
      </div>
    )
  }
}

ShelfContent.defaultProps = {
  itemsPerPage: 5
};

ShelfContent.propTypes = {
  /** List of products */
  products: PropTypes.arrayOf(ShelfItem.propTypes.item),
  /** Max Items per page */
  itemsPerPage: PropTypes.number.isRequired,
  /** Max items in shelf */
  maxItems: PropTypes.number.isRequired,
  /** Show Arrows */
  arrows: PropTypes.bool.isRequired,
  /** Scroll type */
  scroll: PropTypes.string.isRequired,
  /** Container width */
  width: PropTypes.number.isRequired,
  /** Props to ProductsSummary */
  summary: PropTypes.any,
  /** Is mobile */
  isMobile: PropTypes.bool,
  /** Gap between Shelf Items */
  gap: PropTypes.oneOf(getGapPaddingValues())
};

export default ShelfContent;
