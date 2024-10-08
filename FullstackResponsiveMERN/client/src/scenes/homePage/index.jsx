
import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget"
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from "scenes/widgets/PostsWidget"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import FriendListWidget from "scenes/widgets/FriendListWidget"

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const { id, picturePath } = useSelector(({user}) => user)

/* Verify wether UserWidget needs userId and picturePath for functionality */
  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={id} picturePath={picturePath} />
        </Box>
        <Box 
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          {/* Moved 'picturePath' from 'MyPostWidget' props into the component  */}
          <MyPostWidget />
          <PostsWidget userId={id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <AdvertWidget />
            <Box m='2rem 0' />
            <FriendListWidget userId={id}/>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage