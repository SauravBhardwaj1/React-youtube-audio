import React from "react";
import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react";

function VideoCard({ video, onClick }) {
  const { snippet, statistics } = video;
  const { title, channelTitle, thumbnails } = snippet;
  const { viewCount, likeCount, dislikeCount, commentCount } = statistics || {};

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={onClick}
      cursor="pointer"
      color={"whitesmoke"}
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
      mt={20}
      border={"0.5px solid Grey"}
      // boxShadow= "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
    >
      <Image src={thumbnails.medium.url} alt={title} />
      <Box p="6">
        <Box mt="2">
          <Heading as="h4" size="md" fontWeight="semibold" lineHeight="tight" color="blue.500">
            {title}
          </Heading>
        </Box>
        <Flex alignItems="center" justify="space-between" mt={2}>
          <Text color="red.600" fontSize="sm">
            Channel: {channelTitle}
          </Text>
          {statistics && (
            <Flex fontSize="sm" color="aqua">
              <Text>
                

                <Text as="span" fontWeight="semibold" mr={1}>
                Views {viewCount}
                </Text>
                
              </Text>
              <Text ml={2}>
                

                <Text as="span" fontWeight="semibold" mr={1}>
                Likes {likeCount}
                </Text>
                
              </Text>
              
              
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default VideoCard;
