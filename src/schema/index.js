import { signUpSchema } from "./Auth/signup.schema";
import { logInSchema } from "./Auth/login.schema";
import { otpSchema } from "./Auth/otp.schema";
import { commentSchema } from "./comment/comment.schema";
import { PostSchema } from "./Post/imagePost";
import { updateProfileSchema } from "./Update/updateProfile";
import { emailSchema } from "./Auth/forgotPassword.schema";
import { resetPasswordSchema } from "./Auth/resetPassword.schema";
import { changePasswordSchema } from "./Auth/changePassword";
import { supportFormSchema } from "./Support";
import { createGroupFormSchema } from "./Messanger/groups";
export {
    createGroupFormSchema,
    supportFormSchema,
    changePasswordSchema,
    resetPasswordSchema,
    emailSchema,
    updateProfileSchema,
    signUpSchema,
    logInSchema,
    otpSchema,
    commentSchema,
    PostSchema
}