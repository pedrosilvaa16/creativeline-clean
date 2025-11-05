import Image from "next/image";
import Link from "next/link";

interface DataType {
    id?: number;
    thumb?: string;
    name?: string;
    designation?: string;
}

const SingleTeamV2 = ({ team }: { team: DataType }) => {
    const { id, thumb, name, designation } = team;

    return (
        <>
            <div className="team-style-two-item">
                <div className="thumb">
                    <Image src={`/assets/img/team/${thumb}`} alt="Image Not Found" width={800} height={900} />
                    <div className="share-link">
                        <i className="fas fa-share-alt" />
                        <ul>
                            <li>
                                <Link className="facebook" href="https://www.facebook.com/" target="_blank">
                                    <i className="fab fa-facebook-f" />
                                </Link>
                            </li>
                            <li>
                                <Link className="youtube" href="https://www.youtube.com" target="_blank">
                                    <i className="fab fa-youtube" />
                                </Link>
                            </li>
                            <li>
                                <Link className="linkedin" href="https://www.linkedin.com/" target="_blank">
                                    <i className="fab fa-linkedin-in" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="info">
                    <h2><Link href={`/team-details/${id}`}>{name}</Link></h2>
                    <span>{designation}</span>
                </div>
            </div>
        </>
    );
};

export default SingleTeamV2;