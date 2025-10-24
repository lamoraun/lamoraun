import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export type NotFoundPageProps = {

}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
    const navigate = useNavigate();
	return (
        <Box textAlign="center" py={10} px={6}>
            <Heading display="inline-block" as="h2" size="2xl" bg="orange.500" color="white" px={4} borderRadius="full">
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Страница не найдена
            </Text>
            <Text color="gray.500" mb={6}>
                Извините, запрашиваемая вами страница не существует.
            </Text>
            <Button
                colorScheme="orange"
                variant="solid"
                onClick={() => navigate('/')}
            >
                Вернуться на главную
            </Button>
        </Box>
	);
}

NotFoundPage.displayName = 'NotFoundPage';

export default React.memo(NotFoundPage);
