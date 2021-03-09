import "./Card.scss";

const Card = () => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content-header">
          <div className="card__content-title">
            <h5 className="card__title">Some article title</h5>
            <button className="card__heart">
              <img
                alt="likes"
                className="card__content-heart"
                src="./heart.svg"
              ></img>
              <span className="card__heart-counter">0</span>
            </button>
          </div>
          <div className="card__content-tags">
            <div className="card__content-tags--elem1">tag1</div>
            <div className="card__content-tags--elem1">Some tag</div>
          </div>
        </div>
        <div className="card__content-text">text</div>
      </div>
      <div className="card__author">
        <div className="card__author-info">
          <div className="card__author-name">some name</div>
          <div className="card__author-birthday">some date</div>
        </div>
        <div className="card__author-avatar"></div>
      </div>
    </div>
  );
};

export default Card;
