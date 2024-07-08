import { useForm } from 'react-hook-form';
import ReactStars from 'react-rating-stars-component';
import { APIrequests } from '../../APIrequests.js';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddReview = ({ closeAddReview, addNewReview, isUpdate, reviewToUpdate }) => {
    const { idBusiness } = useParams();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: isUpdate ? reviewToUpdate : { description: '', rating: 0 },
        shouldUnregister: false
    });

    const rating = watch('rating');

    const onSubmit = async (data) => {
        if (!user) {
            alert('You need to be logged in to add a review.');
            history.push('/login');
            return;
        }

        try {
            const APIrequest = new APIrequests();
            const date = convertToMySQLDateTime(new Date().toISOString());

            const review = {
                "rating": data.rating,
                "description": data.description,
                "userId": user.idUser,
                "businessId": idBusiness,
                "productionDate": isUpdate ? convertToMySQLDateTime(reviewToUpdate.productionDate) : date
            };
            // const review = {
            //     "rating": data.rating,
            //     "description": data.description,
            // }
            // if (!isUpdate){
            //     review.userId=user.idUser,
            //     review.businessId=idBusiness,
            //     review.productionDate=date;
            // }

            const url = isUpdate ? `/reviews/${reviewToUpdate.idReview}` : `/reviews`;
            const method = isUpdate ? 'putRequest' : 'postRequest';
            const response = await APIrequest[method](url, review);
            
            review.idReview = isUpdate ? reviewToUpdate.idReview : response;
            review.userName = user.userName;
            addNewReview(review);
            closeAddReview();
        } catch (error) {
            alert('Error adding review');
        }
    };

    return (
        <Modal
            open={true}
            onClose={closeAddReview}
        >
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, width: '35%', mx: 'auto', mt: '10%' }}>
                <TextField
                    fullWidth
                    label="Add your review"
                    margin="normal"
                    multiline
                    rows={5}
                    {...register("description", { required: "Please enter your review." })}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                />
                <ReactStars
                    count={5}
                    value={rating}
                    size={24}
                    isHalf={true}
                    edit={true}
                    onChange={(newRating) => setValue('rating', newRating)}
                    activeColor="#ffd700"
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </Modal>
    );
};

const convertToMySQLDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

export default AddReview;