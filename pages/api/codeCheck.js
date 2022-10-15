export default async (req, res) => {
  const { code } = req.body
  if (code === '300722') {
    res.json({ message: 'Success' })
  } else {
    res.json({ error: 'Error sending email' })
  }
}