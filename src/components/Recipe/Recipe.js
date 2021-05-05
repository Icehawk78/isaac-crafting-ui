import './Recipe.css';
import { Card, CardContent, Typography } from '@material-ui/core';
import Material from '../Material/Material';

const Item = ({materials, item}) => {
    return (
        <Card>
            <CardContent>
                {materials.map(m => (
                    <Material action={() => {}} type={m} />
                ))}
                <div className={`sprite i${item.id}`}></div>
                <Typography>{item.name}</Typography>
            </CardContent>
        </Card>
    )
};

export default Item;