import Counter from "../counter/Counter";

interface DataType {
    count: number;
    suffix: string;
    label: string;
    duration: string;
    animation: string
}

const SingleFactV1 = ({ fact }: { fact: DataType }) => {
    const { count, suffix, label, duration, animation } = fact

    return (
        <>
            <div className={`fun-fact wow ${animation}`} data-wow-duration={duration}>
                <div className="counter">
                    <div className="timer"><Counter end={count} /></div>
                    <div className="operator">{suffix}</div>
                </div>
                <span className="medium">{label}</span>
            </div>
        </>
    );
};

export default SingleFactV1;