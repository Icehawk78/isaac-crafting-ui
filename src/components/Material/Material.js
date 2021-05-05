import './Material.css';
import { IconButton } from '@material-ui/core';

const Item = ({action, type}) => {
    return (
        <IconButton onClick={action}>
            <div className={`item ${type}`}></div>
        </IconButton>
    )
};

export default Item;