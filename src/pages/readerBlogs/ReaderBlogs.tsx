import { useCallback, useEffect, useMemo, useState } from "react";
import { Post, PostCreate, initialPostState } from "../../common/types";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { Loader } from "../../components/loader/Loader";
import { ReaderBlogsModalForm } from "./ReaderBlogsModalForm";
import { usePostReaderBlogs } from "../../api/usePostReaderBlogs";
import { ReaderBlogsLayout } from "./ReaderBlogsLayout";
import { ReaderBlogsButton } from "./ReaderBlogsButton";
import { Grid, Title } from "@mantine/core";
import { Footer } from "../../components/footer/Footer";
import {
  setDataReaderBlogs,
  setPageReaderBlogs,
  updLikeReaderBlog,
} from "../../redux/readerBlogsSlice";
import { UseReaderBlogsApi } from "../../api/useReaderBlogsApi";
import { Paginator } from "../../components/pagination/Paginator";

export const ReaderBlogs = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const pageReaderBlogs = useAppSelector(
    (state) => state.readerBlogs.pageReaderBlogs
  );

  const [currentPost, setCurrentPost] = useState<number | "create">(0);

  const [postForm, setPostForm] = useState<Post | PostCreate>(initialPostState);

  const [opened, { open, close }] = useDisclosure(false);

  const [onAuth, { open: openAuth, close: closeAuth }] = useDisclosure(false);

  const ReaderBlogsApi = UseReaderBlogsApi();

  const { data, isLoading, requestAddLike, mutatePost } = ReaderBlogsApi;

  useEffect(() => {
    data && dispatch(setDataReaderBlogs(data));
  }, [data]);

  const post: Post | PostCreate = useMemo(() => {
    const findPost = user?.posts.find((el: Post) => el.id === currentPost);
    return currentPost === "create" || findPost === undefined
      ? initialPostState
      : findPost;
  }, [currentPost, user?.posts]);

  useEffect(() => {
    setPostForm(post);
  }, [post]);

  const submitPost = usePostReaderBlogs({ mutatePost, postForm, close });

  const addLikeHandler = useCallback(
    ({
      description,
      postImageUrl,
      title,
      date,
      likes,
      id,
    }: PostCreate & { id: number }) => {
      if (!user || !user.token) {
        openAuth();
        notifications.show({
          message: "Войдите в аккаунт, чтобы добавить лайк",
          autoClose: 5000,
          color: "red",
          fz: "md",
        });
        return;
      }

      const postLike = {
        description,
        postImageUrl,
        title,
        date,
        likes: likes + 1,
        id,
      };

      dispatch(updLikeReaderBlog(id));
      requestAddLike(postLike);
    },
    [requestAddLike, user]
  );

  const addPostHandler = () => {
    if (!user) {
      openAuth();
      notifications.show({
        message: "Войдите в аккаунт, чтобы добавить пост",
        autoClose: 5000,
        color: "red",
        fz: "md",
      });
      return;
    }

    open();
    setCurrentPost("create");
  };

  const addCurrentPostHadler = useCallback((id: number) => {
    setCurrentPost(id);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader title="Ищем авторов и блоги..." />
      ) : (
        <>
          <Grid>
            <ReaderBlogsModalForm
              opened={opened}
              close={close}
              postForm={postForm}
              setPostForm={setPostForm}
              currentPost={currentPost}
              mutatePost={mutatePost}
              submitPost={submitPost}
              onAuth={onAuth}
              closeAuth={closeAuth}
            />

            <Grid.Col xs={4} sm={6} md={4} xl={4}>
              <ReaderBlogsButton addPostHandler={addPostHandler} />
            </Grid.Col>

            <Grid.Col xs={8} sm={6} md={8} xl={8}>
              <Title pl={"10%"} tt={"uppercase"} color="yellow">
                Блоги читателей
              </Title>
            </Grid.Col>

            <Grid.Col span={12}>
              <ReaderBlogsLayout
                data={data}
                open={open}
                addCurrentPostHadler={addCurrentPostHadler}
                addLikeHandler={addLikeHandler}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Paginator
                currentPage={pageReaderBlogs}
                action={setPageReaderBlogs}
                totalPage={Math.ceil(
                  (ReaderBlogsApi.allDataReaderBlogs?.length ?? 0) / 4
                )}
              />
            </Grid.Col>
          </Grid>

          <Footer />
        </>
      )}
    </>
  );
};
