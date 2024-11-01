import 'bootstrap/dist/css/bootstrap.min.css';
import Item from './Item';

function Destaques() {
    return (
        <div className="container justify-center page-background my-2">
            <h2 className="text-black mb-4">Destaques</h2>
            <ul
                style={{
                    listStyleType: 'none',
                    padding: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                }}
            >
                <Item id="tt15239678" />
                <Item id="tt5537002" />
                <Item id="tt6587046" />
                <Item id="tt14230458" />
                <Item id="tt1517268" />
                <Item id="tt15398776" />
                
            </ul>
        </div>
    );
}

export default Destaques;
