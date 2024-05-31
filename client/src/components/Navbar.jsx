import React, { useState } from 'react';
import { Flex, Input, IconButton, InputGroup, InputRightElement, Image, Button, Spacer, Tooltip, useBreakpointValue } from '@chakra-ui/react';
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

  const isMobile = useBreakpointValue({ base: true, md: false });
  const inputWidth = useBreakpointValue({ base: '100%', md: '600px' });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="black"
      color="white"
      borderBottom="1px solid rgba(0, 1, 0, 0.1)"
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
      <Flex align="center">
        {!isMobile && (
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            bg="transparent"
            color="white"
            _hover={{ color: 'white' }}
            mr={2}
          />
        )}

        <Image src="https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg" alt="youtube-logo" w={{ base: '80px', md: '200px' }} h={{ base: '24px', md: '40px' }} />
      </Flex>

      <Flex flex="1" justify="center" mx={{ base: 2, md: 5 }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: inputWidth }}>
          <InputGroup maxW="100%">
            <Input
              placeholder="Search videos..."
              value={query}
              onChange={handleInputChange}
              bg="gray.900"
              color="white"
              border="1px solid gray"
              borderRadius="md"
              _placeholder={{ color: 'gray.400' }}
              px={4}
              py={2}
              width="100%"
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

      <Flex align="center">
        {!isMobile && (
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
        )}

        {!isMobile && (
          <Tooltip label="Notifications">
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              bg="transparent"
              color="white"
              _hover={{ color: 'white' }}
              mr={3}
              fontSize={{ base: '20px', md: '24px' }}
            />
          </Tooltip>
        )}

        <Tooltip label="Profile">
          <Button
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            mr={isMobile ? 1 : 3}
          >
            <Image src="https://via.placeholder.com/150" alt="Profile Icon" w="40px" h="40px" borderRadius="full" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Navbar;
