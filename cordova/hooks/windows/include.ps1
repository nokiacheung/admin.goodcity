$PackageIdentityName = 'CrossroadsInternationalLt.GoodCityAdminStaging'
$PublisherId = 'CN=28AEBCE6-DBEF-4BED-A504-E107E874FB14'
$PublisherDisplayName = 'Crossroads Foundation Ltd'

$folder = 'platforms\windows'

Copy-Item -Path "hooks\windows\Package.StoreAssociation.xml" -Destination "$folder\Package.StoreAssociation.xml"

$projitemsPath = "$folder\CordovaApp.projitems"
$projitems = [xml](Get-Content $projitemsPath)
$content = $projitems.CreateElement('Content', 'http://schemas.microsoft.com/developer/msbuild/2003')
$content.SetAttribute('Include', '$(MSBuildThisFileDirectory)Package.StoreAssociation.xml')
$projitems.Project.ItemGroup.AppendChild($content)
$projitems.Save($projitemsPath)

$manifestPath = "$folder\package.phone.appxmanifest"
$manifest = [xml](Get-Content $manifestPath)
$manifest.Package.Identity.Name = $PackageIdentityName
$manifest.Package.Identity.Publisher = $PublisherId
$manifest.Package.Properties.PublisherDisplayName = $PublisherDisplayName
$manifest.Package.Applications.Application.VisualElements.SetAttribute('ToastCapable', 'true')
$manifest.Save($manifestPath)
