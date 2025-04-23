
import { useLogoutMutation } from "@/features/auth/service"
import { showLoader ,hideLoader} from "@/features/ui/LoaderOverlaySlice"
import { logout} from "@/features/auth/authSlice"
import { useAppDispatch } from "@/hooks/hooks";

export function ProfileDropdown() {
 const dispatch= useAppDispatch()
  const [
    logoutapi,
    {
      // currentData,
      isFetching,
      isLoading,
      isSuccess,
      isError,
      error,
      status,
    },
  ] = useLogoutMutation();

  
    const handleLogout = async () => {
      console.log("Submitting:");
      // Handle the submission logic (like calling API, etc.)
      try {
        await logoutapi().unwrap()
        dispatch(logout({}))
        dispatch(showLoader({
          isLoading:true
        }))
      } catch (error) {
        dispatch(hideLoader())
      }
    };
  
    return (
      <div className="absolute right-0 mt-2 w-48 bg-background shadow-lg rounded-md border z-50">
        <ul>
          <li className="px-4 py-2 hover:bg-muted cursor-pointer">Profile</li>
          <li className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    )
  }
  