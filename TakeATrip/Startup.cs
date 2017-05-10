using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TakeATrip.Startup))]
namespace TakeATrip
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
