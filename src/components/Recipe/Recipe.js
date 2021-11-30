import './Recipe.css';
import { Card, CardContent, CardActionArea, CardActions, Button } from '@material-ui/core';
import Material from '../Material/Material';

const Item = ({materials, item, action}) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    {materials.map(m => (
                        <Material action={() => {}} type={m} />
                    ))}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    startIcon={<div className={`sprite i${item.id}`}></div>}
                    onClick={action}>
                    {item.name}
                </Button>
            </CardActions>
        </Card>
    )
};

export default Item;