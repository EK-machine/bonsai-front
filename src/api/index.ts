import article from './article/article.api';
import bonsai from './bonsai/bonsai.api';
import instrument from './instrument/instrument.api';
import pot from './pot/pot.api';
import service from './service/service.api';
import signIn from './sign-in/sign-in.api';
import soil from './soil/soil.api';


const Api = {
  ...signIn,
  ...bonsai,
  ...article,
  ...instrument,
  ...pot,
  ...service,
  ...soil,
};

export default Api;