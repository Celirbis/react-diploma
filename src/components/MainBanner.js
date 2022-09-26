import bannerIMG from "../img/banner.jpg";

function MainBanner() {
    return (
                <div className="banner">
                    <img src={bannerIMG} className="img-fluid" alt="К весне готовы!"/>
                        <h2 className="banner-header">К весне готовы!</h2>
                </div>
    );
}

export default MainBanner;