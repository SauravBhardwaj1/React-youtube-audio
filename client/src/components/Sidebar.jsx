import React, { useState } from 'react';
import { Box, Flex, Text, Stack, Icon, useMediaQuery, IconButton } from '@chakra-ui/react';
import { FiMenu, FiHome, FiCompass, FiVideo, FiClock, FiPlay, FiThumbsUp, FiGrid, FiSend, FiSettings, FiHelpCircle } from 'react-icons/fi'; // Import icons

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Smaller Screens */}
      {!isLargerThan768 && (
        <Flex align="center" justify="space-between" px={4} py={2}>
          <IconButton
            aria-label="Open Sidebar"
            icon={<FiMenu />}
            bg="transparent"
            color="white"
            mt={12}
            _hover={{ color: 'white' }}
            onClick={toggleSidebar}
          />
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            YouTube
          </Text>
          <Box w="24px" />
        </Flex>
      )}

      {/* Sidebar Content */}
      <Box
        as="aside"
        bg="black"
        color="white"
        borderRight="1px solid #E5E7EB" 
        boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)" 
        py={6}
        position="fixed"
        h="100vh" 
        overflowY="auto" 
        display={isSidebarOpen || isLargerThan768 ? 'block' : 'none'}
        width={{ base: '100%', md: '250px' }} // Adjust width based on screen size
        zIndex={10}
        left={0}
      >
        {/* Logo */}
        <Flex align="center" mb={8} mt={10}>
          <Text fontSize="2xl" fontWeight="bold" color="red.500">
            YouTube
          </Text>
        </Flex>

        {/* Navigation */}
        <Stack spacing={2}>
          <SidebarItem icon={<Icon as={FiHome} />} text="Home" />
          <SidebarItem icon={<Icon as={FiCompass} />} text="Explore" />
        </Stack>

        {/* Library */}
        <Box mt={8}>
          <Text fontSize="md" fontWeight="bold" color="red.500" ml={4} mb={2}>
            LIBRARY
          </Text>
          <Stack spacing={2}>
            <SidebarItem icon={<Icon as={FiVideo} />} text="Videos" />
            <SidebarItem icon={<Icon as={FiClock} />} text="Watch Later" />
            <SidebarItem icon={<Icon as={FiPlay} />} text="Your Videos" />
            <SidebarItem icon={<Icon as={FiThumbsUp} />} text="Liked Videos" />
          </Stack>
        </Box>

        {/* More from YouTube */}
        <Box mt={8}>
          <Text fontSize="md" fontWeight="bold" color="red.500" ml={4} mb={2}>
            MORE FROM YOUTUBE
          </Text>
          <Stack spacing={2}>
            <SidebarItem icon={<Icon as={FiGrid} />} text="YouTube Premium" />
            <SidebarItem icon={<Icon as={FiVideo} />} text="Movies & Shows" />
            <SidebarItem icon={<Icon as={FiSettings} />} text="Settings" />
            <SidebarItem icon={<Icon as={FiHelpCircle} />} text="Help" />
            <SidebarItem icon={<Icon as={FiSend} />} text="Send Feedback" />
          </Stack>
        </Box>
      </Box>

      
    </>
  );
}

// Sidebar item component
const SidebarItem = ({ icon, text }) => (
  <Flex align="center" cursor="pointer" _hover={{ color: "red.500" }}>
    {icon}
    <Text ml={3}>{text}</Text>
  </Flex>
);

export default Sidebar;
