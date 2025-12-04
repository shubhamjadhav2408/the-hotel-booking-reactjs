import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: checkin, isPending: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, otherUpdates }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...otherUpdates,
			}),

		onSuccess: (data) => {
			toast.success(`Booking #${data.id} was successfully checked in.`);
			queryClient.invalidateQueries({ active: true });
			navigate("/");
		},
	});

	return { checkin, isCheckingIn };
};
