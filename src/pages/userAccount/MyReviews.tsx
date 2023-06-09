import { Badge, Button, Card, Flex, Grid, Group, Image, Modal, Rating, Text } from '@mantine/core';
import { ReviewUpdate } from '../../common/types';
import { FC, memo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from 'react-query';
import { fetchHandler, FetchType } from '../../api/postOrReviewApi';
import { getCurrentDate } from '../../helpers/getCurrentDate';
import { useAppSelector } from '../../redux/redux.hooks';
import EmptyData from './assetsUserAccount/EmptyData';
import { useCurrentUser } from '../../hooks/useCurrenUser';
import ModalReviewFields from '../catalog/UI/ModalReviewFields';

type MyReviewsType = {};
export type FetchReviewArgs = {
  type: FetchType;
  params: string;
  body: ReviewUpdate;
  token: string;
};
const initialReviewState: ReviewUpdate = {
  date: '',
  text: '',
  rate: 1,
};
const MyReviews: FC<MyReviewsType> = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const user = useAppSelector((state) => state.auth.user);
  const [currentReview, setCurrentReview] = useState<null | { itemId: number; reviewId: number }>(
    null,
  );

  const [review, setReview] = useState(initialReviewState);
  const getCurrentUser = useCurrentUser();
  const reviewMutation = useMutation((args: FetchReviewArgs) =>
    fetchHandler(args.type, args.params, args.body, args.token),
  );
  const submitReview = async (type: FetchType, item: { itemId: number; reviewId: number }) => {
    if (!user) return;
    const params = `review/${item.itemId}/${item.reviewId}`;
    await reviewMutation.mutateAsync({ type, params, body: review, token: user.token });
    getCurrentUser();
    close();
  };
  return (
    <>
      <Modal size="lg" opened={opened} onClose={close} centered>
        <ModalReviewFields setReview={setReview} review={review} />
        <Button
          onClick={() => {
            submitReview('put', {
              itemId: currentReview?.itemId as number,
              reviewId: currentReview?.reviewId as number,
            });
          }}
          loading={reviewMutation.isLoading}>
          Изменить
        </Button>
      </Modal>
      {user?.reviews.length === 0 && <EmptyData text="Вы не написали ни одного отзыва" />}
      <Grid>
        {user &&
          user.reviews.map((el) => (
            <Grid.Col span={4} key={el.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder mt={10} w={230}>
                <Card.Section>
                  <Flex justify="center">
                    <Image src={el.itemImageUrl} height={192} width={128} alt="Norway" mt={10} />
                  </Flex>
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text truncate>{el.itemTitle}</Text>
                  <Rating value={el.rate} readOnly />
                </Group>
                <Badge color="violet" variant="light" mb={10}>
                  {el.date}
                </Badge>
                <Text size="sm" color="dimmed" truncate>
                  {el.text}
                </Text>
                <Flex direction="column">
                  <Button
                    variant="light"
                    color="blue"
                    mt="md"
                    radius="md"
                    loading={reviewMutation.isLoading}
                    onClick={() => {
                      open();
                      setCurrentReview({
                        itemId: el.itemId,
                        reviewId: el.id,
                      });
                      setReview({
                        date: getCurrentDate(),
                        text: el.text,
                        rate: el.rate,
                      });
                    }}>
                    Изменить отзыв
                  </Button>
                  <Button
                    variant="light"
                    color="pink"
                    mt="md"
                    radius="md"
                    onClick={() => submitReview('delete', { itemId: el.itemId, reviewId: el.id })}
                    loading={reviewMutation.isLoading}>
                    Удалить отзыв
                  </Button>
                </Flex>
              </Card>
            </Grid.Col>
          ))}
      </Grid>
    </>
  );
};

export default memo(MyReviews);
