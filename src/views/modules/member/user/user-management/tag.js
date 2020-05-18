import {
  getMessageList,
  tagDetail,
  getMessageListCount,
  memberLog,
  alladdTags,
  allsignLabel,
} from '@/api/member/member'

const addTag = async function(members, Tags) {
  const params = {
    channelFansIds: members,
    tagIds: Tags,
  }
  return alladdTags(params)
}
export default {
  addTag: addTag,
}
