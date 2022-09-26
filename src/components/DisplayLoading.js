import Preloader from "./Preloader";

/**
 * Отображает лоадер если загрузка еще не прошла или дочерние элементы если она прошла
 * @param {boolean} loading - true если еще грузится
 */

function DisplayLoading(props) {

    const {loading} = props;

    return (
        loading ? <Preloader/> : props.children
    );
}

export default DisplayLoading;