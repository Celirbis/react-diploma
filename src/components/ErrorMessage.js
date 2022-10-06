function ErrorMessage({ error }) {

    return (
        <div>
            <p>{`Произошла ошибка! (${error})`}</p>
        </div>
    );
}

export default ErrorMessage;


