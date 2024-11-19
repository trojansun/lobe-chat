import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { threadSelectors } from '@/store/chat/selectors';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    cursor: pointer;
    background: ${token.colorFillQuaternary};
    border-radius: 6px;
  `,
}));

interface ThreadProps {
  id: string;
  placement: 'start' | 'end';
}
const Thread = memo<ThreadProps>(({ id, placement }) => {
  const { styles } = useStyles();

  const thread = useChatStore(threadSelectors.getThreadBySourceMsgId(id), isEqual);

  return (
    <Flexbox
      direction={placement === 'end' ? 'horizontal-reverse' : 'horizontal'}
      gap={12}
      paddingInline={16}
    >
      <div style={{ width: 40 }} />
      <Flexbox className={styles.container} padding={8} style={{ width: 'fit-content' }}>
        {thread?.title}
        {dayjs(thread?.lastActiveAt).format('YYYY-MM-DD')}
      </Flexbox>
    </Flexbox>
  );
});

export default Thread;
