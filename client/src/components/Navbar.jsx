import React, { useState } from 'react';
import { Flex, Input, IconButton, InputGroup, InputRightElement, Image, Button, Spacer, Tooltip } from '@chakra-ui/react';
import { FiMenu, FiSearch, FiVideo, FiBell } from 'react-icons/fi';

function Navbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="black"
      color="white"
      borderBottom="1px solid #E5E7EB"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
      width="100%"
      px={5}
      py={2}
      height="80px"
    >
      <IconButton
        aria-label="Menu"
        icon={<FiMenu />}
        bg="transparent"
        color="white"
        _hover={{ color: 'white' }}
        mr={2}
      />

      <Flex align="center" mr={2}>
        <Image src="https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg" alt="youtube-logo" w={{ base: '100px', md: '200px' }} h={{base: '30px', md: '40px'}} />
      </Flex>

      <Flex as="nav" align="center" justify="space-between" bg="gray.900" color="white" px={5} py={2} flex="1">
        <form onSubmit={handleSubmit}>
          <InputGroup w="100%">
            <Input
              placeholder="Search videos.."
              value={query}
              onChange={handleInputChange}
              bg="transparent"
              color="white"
              border="none"
              _placeholder={{ color: 'gray.400' }}
            />
            <InputRightElement>
              <IconButton
                type="submit"
                aria-label="Search"
                icon={<FiSearch />}
                bg="transparent"
                color="white"
                _hover={{ color: 'gray.300' }}
              />
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>

      <Spacer />

      <Tooltip label="Create a video">
        <IconButton
          aria-label="Create Video"
          icon={<FiVideo />}
          bg="transparent"
          color="white"
          _hover={{ color: 'white' }}
          mr={3}
        />
      </Tooltip>

      <Tooltip label="Notifications">
        <IconButton
          aria-label="Notifications"
          icon={<FiBell />}
          bg="transparent"
          color="white"
          _hover={{ color: 'white' }}
          mr={3}
        />
      </Tooltip>

      <Tooltip label="Profile">
        <Button
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
        >
          <Image src="https://via.placeholder.com/150" alt="Profile Icon" w="40px" h="40px" borderRadius="full" />
        </Button>
      </Tooltip>
    </Flex>
  );
}

export default Navbar;
