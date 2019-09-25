export function getTeam ()  {
    const teamsObject = this.parse.Object.extend("teams");
    const getTeam = new this.parse.Query(teamsObject);
    return getTeam.get.length;
  }