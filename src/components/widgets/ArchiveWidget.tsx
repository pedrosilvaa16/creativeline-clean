import Link from 'next/link';
import handleSmoothScroll from '../utilities/handleSmoothScroll';

const ArchiveWidget = () => {
    return (
        <>
            <div className="sidebar-item archives">
                <h4 className="title">Archives</h4>
                <div className="sidebar-info">
                    <ul>
                        <li><Link href="#" onClick={handleSmoothScroll}>Aug 2023</Link></li>
                        <li><Link href="#" onClick={handleSmoothScroll}>Sept 2023</Link></li>
                        <li><Link href="#" onClick={handleSmoothScroll}>Nov 2023</Link></li>
                        <li><Link href="#" onClick={handleSmoothScroll}>Dec 2023</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ArchiveWidget;